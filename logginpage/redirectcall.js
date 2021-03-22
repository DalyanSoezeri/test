function redirecttocall (){
    const {v4: uuidV4} = require('uuid');


    res.redirect(`/${uuidV4()}`);


}