import request from "supertest";
import { closeDatabase } from '../utils/db-handler'
import { app } from "../../src/index";
import { dataTask } from "../data/task.data";





let cookieJWTUser: string[]

let cookieJWTOtherUser: string[]

beforeAll(async () => {

    const respUser = await request(app).post("/api/auth/signup")
        .set('Content-type', 'application/json')
        .send({ "name": "testjwt", "email": "jwttoken@hotmail.com", "password": "123456" });
   
    cookieJWTUser = respUser.get('Set-Cookie')

    const respOtherUser = await request(app).post("/api/auth/signup")
        .set('Content-type', 'application/json')
        .send({ "name": "testjwtother" ,"email": "jwttokenother@hotmail.com", "password": "123456" });
  
    cookieJWTOtherUser = respOtherUser.get('Set-Cookie')

})

afterAll(() => {
    closeDatabase()
}
);


describe("create  task ", () => {

    test("create one task  ", async () => {
        const resp = await request(app).post("/api/task")
            .set('Content-type', 'application/json')
            .set('Cookie', cookieJWTUser)
            .send({
                "title": "ma tache Rosa",
                "details": "Voila ces fameux details"
            })
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual(expect.objectContaining({
            "title": "ma tache Rosa",
            "details": "Voila ces fameux details"
        }))

    });

    test("create one task with no title  ", async () => {
        const resp = await request(app).post("/api/task")
            .set('Content-type', 'application/json')
            .set('Cookie', cookieJWTUser)
            .send({
                "details": "Voila ces fameux details"
            })
            expect(resp.statusCode).toBe(404)
            expect(resp.body).toMatchObject({ errors:[{ "field": "title","message": "Vous n' avez pas de titre ",}]  })

       
    

    });

 

    test("create one task without auth", async () => {
        const resp = await request(app).post("/api/task")
            .set('Content-type', 'application/json')
            .send({
                "title": "ma tache Rosa",
                "details": "Voila ces fameux details"
            })
        expect(resp.statusCode).toBe(404)
    });
})


describe("get  tasks   ", () => {
    let tasksUsersId: string[] = []
    let tasksUserOtherId: string[] = []
    beforeAll(async () => {
        await dataTask.reduce(async (a, element,index) => {
            // Wait for the previous item to finish processing
            await a;
            // Process this item
            if (index<5){
                const resp = await request(app).post("/api/task")
                .set('Content-type', 'application/json')
                .set('Cookie', cookieJWTUser)
                .send({
                    "title":element.title,
                    "details":element.details
                })
            tasksUsersId.push(resp.body._id)
            }else{
                const resp = await request(app).post("/api/task")
                .set('Content-type', 'application/json')
                .set('Cookie',cookieJWTOtherUser)
                .send({
                    "title":element.title,
                    "details":element.details
                })
                tasksUserOtherId.push(resp.body._id)
            }

        }, Promise.resolve());

    })
    
    test("get my tasks first user ", async () => {
        const resp = await request(app).get("/api/task")
            .set('Content-type', 'application/json')
            .set('Cookie', cookieJWTUser)
    
        expect(resp.statusCode).toBe(200)
        expect(resp.body.length).toEqual(6)
        expect(resp.body[0].title).toEqual("Ma 5 tache ")
        expect(resp.body[1].title).toEqual("Ma 4 tache ")
        expect(resp.body[2].title).toEqual('Ma 3 tache ')
        expect(resp.body[3].title).toEqual('Ma 2 tache ')
        expect(resp.body[4].title).toEqual('Ma 1 tache ')
        expect(resp.body[5].title).toEqual('ma tache Rosa')
        
    });

    test("get my tasks other user ", async () => {
        const resp = await request(app).get("/api/task")
            .set('Content-type', 'application/json')
            .set('Cookie', cookieJWTOtherUser)
        expect(resp.statusCode).toBe(200)
        expect(resp.body.length).toEqual(4)
        expect(resp.body[0].title).toEqual("Ma 9 tache ")
        expect(resp.body[1].title).toEqual("Ma 8 tache ")
        expect(resp.body[2].title).toEqual('Ma 7 tache ')
        expect(resp.body[3].title).toEqual('Ma 6 tache ')

    });


    test("get my tasks first user with order ", async () => {
        const resp = await request(app).get("/api/task")
            .set('Content-type', 'application/json')
            .set('Cookie', cookieJWTUser)
            .send({ "order": "ASC" });
        
        expect(resp.statusCode).toBe(200)
        expect(resp.body.length).toEqual(6)
        expect(resp.body[0].title).toEqual('ma tache Rosa')
        expect(resp.body[1].title).toEqual('Ma 1 tache ')
        expect(resp.body[2].title).toEqual('Ma 2 tache ')
        expect(resp.body[3].title).toEqual('Ma 3 tache ')
        expect(resp.body[4].title).toEqual("Ma 4 tache ")
        expect(resp.body[5].title).toEqual("Ma 5 tache ")
 
    });




    test("get some of my  task without token  ", async () => {
  
        const resp = await request(app).get("/api/task")
          .set('Content-type', 'application/json')
          expect(resp.statusCode).toBe(404)
          expect(resp.body).toMatchObject({ message: "Your are not logged in" })

      });

    test("get one of my tasks first user ", async () => {
        const resp = await request(app).get("/api/task/"+tasksUsersId[0])
            .set('Content-type', 'application/json')
            .set('Cookie', cookieJWTUser)
        
        expect(resp.statusCode).toBe(200)
        expect(resp.body.title).toEqual('Ma 1 tache ')
    });

    test("get one of my tasks first user wroong id  ", async () => {
        const resp = await request(app).get("/api/task/"+tasksUserOtherId[0])
            .set('Content-type', 'application/json')
            .set('Cookie', cookieJWTUser)   
        expect(resp.statusCode).toBe(404)

    });




    test("get one of my tasks of other user (wrong owner) ", async () => {
  
        const resp = await request(app).get("/api/task/"+tasksUserOtherId[0])
          .set('Content-type', 'application/json')
          expect(resp.statusCode).toBe(404)
          expect(resp.body).toMatchObject({ message: "Your are not logged in"})

      });


  
      test("get one task with wrong Id ", async () => {
  
        const resp = await request(app).get("/api/task/534651")
          .set('Content-type', 'application/json')
          .set('Cookie', cookieJWTUser)
          expect(resp.statusCode).toBe(404)
    
      });


})




    describe("update and delete tasks  ", () => {
      let taskIdToGet:String|null = null
      beforeAll(async()=>{
         const resp = await request(app).post("/api/task")
          .set('Content-type', 'application/json')
          .set('Cookie', cookieJWTUser)
          .send({ 
        "title":"test_update",
          "details": "mon detail teststts",
       })
       
       taskIdToGet= resp.body._id
       
        });
  
       
     
        test("update task  ", async () => {
            

          const resp = await request(app).post("/api/task/"+taskIdToGet)
           .set('Content-type', 'application/json')
            .set('Cookie', cookieJWTUser)
            .send({ 
                "title":"test_update_apres",
                "details": "mon detail teststts_apres",
               })

            expect(resp.statusCode).toBe(200)
            expect(resp.body.title).toBe("test_update_apres");
            expect(resp.body.details).toBe("mon detail teststts_apres");
        });

        
       
  
        test("update task without wrong jwt account", async () => {
          const resp = await request(app).post("/api/task/"+taskIdToGet)
          .set('Content-type', 'application/json')
            .set('Cookie', cookieJWTOtherUser)
            .send({ 
                "title":"test_update_apres",
                "details": "mon detail teststts_apres",
               })
            expect(resp.statusCode).toBe(404)
            expect(resp.body).toMatchObject({ message: "Your are not allowed" })
  
        });

        test("delete task with wrong jwt", async () => {
            const resp = await request(app).delete("/api/task/"+taskIdToGet)
            .set('Content-type', 'application/json')
              .set('Cookie', cookieJWTOtherUser)
              expect(resp.statusCode).toBe(404)
              expect(resp.body).toMatchObject({ message: "Your are not allowed" })

              const respAfterDelte =  await request(app).get("/api/task/"+taskIdToGet)
              .set('Content-type', 'application/json')
              .set('Cookie', cookieJWTUser)
              expect(respAfterDelte.statusCode).toBe(200)
              expect(respAfterDelte.body.title).toEqual('test_update_apres')
    
          });

        
          test("delete task with good jwt", async () => {
            const resp = await request(app).delete("/api/task/"+taskIdToGet)
            .set('Content-type', 'application/json')
              .set('Cookie', cookieJWTUser)
              expect(resp.statusCode).toBe(200)
             
            const respAfterDelte =  await request(app).get("/api/task/"+taskIdToGet)
            .set('Content-type', 'application/json')
            .set('Cookie', cookieJWTUser)
            expect(respAfterDelte.statusCode).toBe(404)
       
    
          });
  
  
  
        
  
      })