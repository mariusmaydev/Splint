

class S_API_ChartJS {
    static get Container(){
        return S_ChartContainer;
    }    
    static parseGradient(S_colorGradient){
        let Storage = [];
        for(const index in S_colorGradient){
            let c = S_Colors.parse(S_colorGradient[index], 'rgba');
                let r = String(c.r).split('.')[0];
                let g = String(c.g).split('.')[0];
                let b = String(c.b).split('.')[0];
                let a = String(c.a).substring(0, 4);
            let str = "rgba" + "( " + r + " , " + g + " , " + b + " , " + a + " )"; 
            Storage.push(str);
        }
        return Storage;
    }
}