//import $ from 'jquery';

const Api = {
    getJuiceList: () => {
        let data = [
            {"id": 1, "name" : "cola", "quantity" : 5, "image" : require("./image/cola.png"), "price" : 900},
            {"id": 2, "name" : "fanta", "quantity" : 5, "image" : require("./image/fanta.png"), "price" : 800},
            {"id": 3, "name" : "pocari", "quantity" : 5, "image" : require("./image/pocari.png"), "price" : 900},
            {"id": 4, "name" : "zero", "quantity" : 5, "image" : require("./image/zero.jpg"), "price" : 700},
            {"id": 5, "name" : "pepsi_bottle", "quantity" : 5, "image" : require("./image/pepsi2.jpg"), "price" : 900},
            {"id": 6, "name" : "sprite", "quantity" : 5, "image" : require("./image/sprite.jpg"), "price" : 600},
            {"id": 7, "name" : "monster", "quantity" : 5, "image" : require("./image/monster.png"), "price" : 900},
            {"id": 8, "name" : "pepsi_can", "quantity" : 5, "image" : require("./image/pepsi_can.png"), "price" : 650},
            {"id": 9, "name" : "cola", "quantity" : 5, "image" : require("./image/cola.png"), "price" : 900},
            {"id": 10, "name" : "cola", "quantity" : 5, "image" : require("./image/cola.png"), "price" : 720},
            {"id": 11, "name" : "cola", "quantity" : 5, "image" : require("./image/cola.png"), "price" : 900},
            {"id": 12, "name" : "cola", "quantity" : 5, "image" : require("./image/cola.png"), "price" : 500},
            {"id": 13, "name" : "cola", "quantity" : 5, "image" : require("./image/cola.png"), "price" : 900},
            {"id": 14, "name" : "cola", "quantity" : 5, "image" : require("./image/cola.png"), "price" : 200},
            {"id": 15, "name" : "cola", "quantity" : 5, "image" : require("./image/cola.png"), "price" : 900},
            {"id": 16, "name" : "cola", "quantity" : 5, "image" : require("./image/cola.png"), "price" : 300},
            {"id": 17, "name" : "monster", "quantity" : 5, "image" : require("./image/monster.png"), "price" : 900},
            {"id": 18, "name" : "monster", "quantity" : 5, "image" : require("./image/monster.png"), "price" : 900},
            {"id": 19, "name" : "monster", "quantity" : 5, "image" : require("./image/monster.png"), "price" : 150},
            {"id": 20, "name" : "monster", "quantity" : 5, "image" : require("./image/monster.png"), "price" : 900},
        ];
        
        //callback(data);

        return data;
    },
}

export default Api;