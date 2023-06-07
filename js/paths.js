



SPLINT.PATHS = new Object();

SPLINT.PATHS.php = new Object();

if(SPLINT.PATHS.rootPath == undefined){
    SPLINT.PATHS.rootPath = location.protocol + "//" + location.host + "/Splint";
}
SPLINT.PATHS.php.email          = SPLINT.PATHS.rootPath + "/php/email/emailAccess.php";
SPLINT.PATHS.php.DataStorage    = SPLINT.PATHS.rootPath + "/php/DataStorage/DataStorageAccess.php";
SPLINT.PATHS.Access             = SPLINT.PATHS.rootPath + "/php/Communication/AccessSplint.php";
SPLINT.PATHS.php.moonraker      = SPLINT.PATHS.rootPath + "/php/API/moonraker/moonrakerAccess.php";

SPLINT.PATHS.php.JSBuilder      = SPLINT.PATHS.rootPath + "/php/JSBuilder/JSBuilderAccess.php";

SPLINT.PATHS.images = new Object();
SPLINT.PATHS.images.error = SPLINT.PATHS.rootPath + "/src/images/error.png";
