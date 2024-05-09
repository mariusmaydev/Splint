<?php

    class S_shmop {
        public static $keys = [];
        public static function write(string $name, mixed $data) : bool {
            return false;
            $ID = self::getName($name);
            // $id = @shmop_open($ID, "c", 0644, 0);
            // shmop_close($id);
            // shmop_delete($id);
            
            $id = @shmop_open($ID, "c", 0644, strlen(serialize($data)));
            
            if ($id != false) {
                return shmop_write($id, serialize($data), 0);
            }
            return false;
        }
        public static function read(string $name) : mixed {
            return null;
            $ID = self::getName($name);
                $id = @shmop_open($ID, "a", 0, 0);
                if ($id) {
                    $data = unserialize(shmop_read($id, 0, shmop_size($id)));
                    if ($data) {                
                        return $data;
                    }
                }
                return false;
        }
        private static function getName(string $name) : int {
            return crc32($name);
        }
        private static function getFtok(string $name) : int{
            return ftok(__FILE__, $name);
        }

    }