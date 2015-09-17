#!/bin/bash

OUTPUT="./output.txt";

while [[ true ]]; do {
    ./run-single.sh >"${OUTPUT}" 2>&1;
    
    clear;
    date;
    if ! grep 'ReferenceError: XY is not defined' "${OUTPUT}" >/dev/null; then {
        echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@";
        echo "@@@ BUG NO LONGER REPRODUCES @@@";
        echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@";
        echo;
    } else {
        echo "### Cool, bug reproduces!";
        echo;
    }; fi
    
    cat "${OUTPUT}";
    sleep 1;
}; done
