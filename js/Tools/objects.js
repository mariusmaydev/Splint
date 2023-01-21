
class Tools_Objects_S {
    static is_equal(obj1, obj2){
        return (JSON.stringify(obj1) == JSON.stringify(obj2));
    }
}