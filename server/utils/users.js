


class User{

    
    constructor (){
        this.counter = 0;
        this.users = [];
    }
    

    addUser(id,name,room){
        // this.id = id;
        // this.name = name;
        // this.room = room;

        var user = {
            id,name,room
        }
        
        users.push(user);

        counter++;
    }

    removeUser(id){
        
        users = users.filter((user)=>{
            return user.id !==id;
        })
        counter--;
        return users;
    }

    getListOfUsers (){
        return users;
    }

    getListOfUsersInRoom(room){
        var usersInRoom = users.filter((user)=>{
            return user.room === room
        });

        return usersInRoom;
    }

    getUser(id){
        var theUser = users.filter((user)=>{
            return user.id === id
        })[0];

        return theUser;
    }

}

module.exports = {User};