const bcryptjs = require('bcryptjs');

(async () => {


    const password="a1b2h3a4y5";




    //creates hash for the password
     const hash = await bcryptjs.hash(password,10);

    console.log(
        hash
    );
    

    let res = await bcryptjs.compare("a1b2h3a4y5",hash);
    console.log(
res    );
    

})();