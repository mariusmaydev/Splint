<?php

    require_once 'email.php';

    switch($_POST["METHOD"]){
        case "GET_BY_UID"           : email::get_by_UID($_POST["UID"]); break;
        case "GET_BY_INDEX"         : email::get_by_index($_POST["index"]); break;
        case "SAVE_BY_INDEX"        : email::save_by_index($_POST["index"]); break;
        case "GET_HEADER_BY_INDEX"  : email::get_header_by_index($_POST["index"]); break;
        case "GET_HEADER_BY_UID"    : email::get_header_by_UID($_POST["UID"]); break;
        case "FILTER"               : email::filter($_POST["query"]); break;
        case "REMOVE_MAIL"          : email::removeMail($_POST["mailNumbers"]); break;
        case "REMOVE_MAIL_UID"      : email::removeMail_UID($_POST["UID"]); break;
        default: print_r("METHOD_ERROR"); exit;
    }
    ?>