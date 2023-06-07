<?php namespace moonraker;
    use Communication;

    require_once 'moonraker.php';

    
    switch(Communication::getAccess()){
        case "TEST"         : moonraker::getServerInfo(); break;
        case "PRINT.START"  : moonraker::printStart(); break;
        default: Communication::sendBack("METHOD ERROR"); break;
    }