<?php
    require_once 'createDocs.php';
    switch(Communication::getAccess()){
        case "TEST" : createDocs::start(); break;
        default     : Communication::sendBack("METHOD_ERROR"); break;
    }