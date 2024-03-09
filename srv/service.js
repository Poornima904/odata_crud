const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    // SERVICE ENTITIES
    let { college } = this.entities;

    // Connect to external service named 'iflow'
    const c4re = await cds.connect.to('iflow');

    // // POST method handler for the 'college' entity--------------------
    // this.on('CREATE', college, async (req,next) => {
    //     try {
    //         debugger
    //         const data = req.data;
    //         const insertedEntry = {
    //             c_id:data.c_id,
    //             c_name:data.c_name,
    //             "IsActiveEntity" : true
    //         }
    //         await c4re.post('/odata/v4/my/college', insertedEntry);
    //         return next();
    //     } catch (error) {
    //         console.error(error);
    //         req.error(error.message);
    //     }
    // });


     // // Before read event hook for the 'college' entity----------------------------------------------
     this.on('READ', college, async (req) => {
        try {
            debugger
            // Fetch data from the external service
            const resp = await c4re.get('/odata/v4/my/college');

            // Extract data from the response
            const data = resp.value;

            // Insert each record into the local 'college' entity
            const entries = data.map(record => ({
                c_id: record.c_id,
                c_name: record.c_name
            }));

            await INSERT.into(college).entries(entries);
        } catch (error) {
            // Handle errors
            req.error(error.message);
        }
    });
});

























// // // REAADING MULTIPLE VALUES
// const cds = require('@sap/cds');

// module.exports = cds.service.impl(async function () {
//     // SERVICE ENTITIES
//     let { college } = this.entities; // Destructuring assignment to access the 'college' entity from 'this.entities'
    
//     // Connect to external service named 'iflow'
//     const c4re = await cds.connect.to('iflow');
//     var readsupp = true;
    

//     // Before read event hook for the 'college' entity
//     this.before('READ', college, async (req) => {
//         // Check if data has already been read
//         if (readsupp) {
//             try {
//                 debugger
//                 // Fetch data from the external service
//                 constresp = await c4re.get('/odata/v4/my/college');
                
//                 // Extract data from the response
//                 const data = resp.value;

//                 // Insert each record into the local 'college' entity
//                 const entries = data.map(record => ({
//                     c_id: record.c_id,
//                     c_name: record.c_name
//                 }));

//                 await INSERT.into(college).entries(entries);
                
//                 // Update flag to indicate that data has been read
//                 readsupp = false;
//             } catch(error) {
//                 // Handle errors
//                 req.error(error.message);
//             }
//         }
//     });
// });
// this.on('POST', college, async (resp) => {
//     debugger
//     try {
//         body = {
//             c_id: resp.data.c_id,
//            c_name: resp.data.c_name
//         }
//         await INSERT.into(college).entries(resp);
//         await c5re.post('/odata/v4/my/college');    //insert in api
//         return resp;
//     } catch (err) {
//         console.log(err);
//     }
// })



























// // READING ONE VALUE
// const cds = require('@sap/cds');
// debugger
// module.exports = cds.service.impl(async function () {
//     / SERVICE ENTITIES /
//     let {
//         college
//     } = this.entities;
//     const c4re = await cds.connect.to('iflow');
//     var readsupp = true;
//     this.before('READ', college, async (req) => {
//         if (readsupp) {
//             try {
//                 const resp = await c4re.get('/odata/v4/my/college');
//                 debugger
//                 const dt = resp.value;
//                 const entry = [];
                
//                 entry.push({
//                     c_id:dt[0].c_id,
//                     c_name:dt[0].c_name
               
//                 });
//                 await INSERT.into(college).entries(entry);
//                 readsupp = false;
//             } catch(error) {
//                 req.error
//                 error.message
//             }
//         }
//     });
// });