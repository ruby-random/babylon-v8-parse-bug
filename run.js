const fs = require('fs');
const _module = require('module');
const babylon = require('babylon');

const FILENAME = './__bug.js';
const PAYLOAD = 'var x=function XY(){XY};x();"é"';

function traverse(node) {
	node = node[{
		Program: 'body',
		VariableDeclaration: 'declarations',
		VariableDeclarator: 'init',
		FunctionExpression: 'id',
		Identifier: 'typeAnnotation',
	}[node.type]];
	
	if (Array.isArray(node)) {
		node = node[0];
	}
	
	if (node) {
		({})[node.name] = null; // seemingly useless? nope
		traverse(node);
	}
}

require.extensions['.js'] = function(module, filename) {
	var source = fs.readFileSync(filename, 'utf8');
	
	/* uncommenting this will "fix": */
	// source = PAYLOAD;
	if (source !== PAYLOAD) { throw new Error('something went wrong. another bug?'); }
	
	const ast = babylon.parse(source);
	
	/*** OPTIONAL BLOCK BEGIN ***/
	var id = ast.program.body[0].declarations[0].init.id;
	
	/* this will break: */
	id.name = source.substring(15, 17);
	
	/* this will "fix": */
	// id.name = JSON.parse(JSON.stringify(id.name));
	/*** OPTIONAL BLOCK END ***/
	
	traverse(ast.program);
	module._compile(source, filename);
	
	return;
}

fs.writeFileSync(FILENAME, PAYLOAD, 'utf8');
_module.Module._load(FILENAME, null, true);
