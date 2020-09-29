const chai = require("chai")
const server = require("../server/server")
const chaiHttp = require("chai-http")
const fs= require("fs")
let blogId=''
let validtoken=''
chai.should()
chai.use(chaiHttp)
describe('Blog Api',()=>{
	describe('GET /blogs',()=>{
		it('should get list of all blogs',(done)=>{
			chai.request(server).get('/blogs')
			.end((error,response)=>{
				blogId=response.body['msg'][0]['_id']
				response.should.have.status(200)
				response.body.should.be.a('Object')
				done()

			})
		})
		// bad request method
		it('bad http request method ,should not get blog list',(done)=>{
			chai.request(server).post('/blogs')
			.end((error,response)=>{
				response.should.have.status(404)
				response.body.should.be.a('object')
				done()
			})
		})
	})
	// get blog by id
	describe("GET /blogs/byId",()=>{
		it('should get blog by id',(done)=>{
			chai.request(server).get(`/blogs/${blogId}`)
			.end((error,response)=>{
				response.should.have.status(200)
				response.body.should.have.property('blog')
				response.body.should.have.property('comments')
				done()
			})
		})

		const badid='787gghdfg63866388'

		it('should not get blog by id becouse invalid bad id format',(done)=>{
			chai.request(server).get(`/blogs/${badid}`)
			.end((error,response)=>{
				response.should.have.status(500)
				response.body.should.have.property('error')
				done()
			})
		})

		const  unvailableid= '5f6738c6e6535c59be7605c9'
		it('should not get blog becouse id not exists',(done)=>{
			chai.request(server).get(`/blogs/${unvailableid}`)
			.end((error,response)=>{
				response.should.have.status(404)
				response.body.should.have.property('message').eq('No blog found!')
				done()
			})
		})

	})
	describe("POST creating blog /blogs",()=>{
		

		it("should not  create new blog becouse unAuthencticated",(done)=>{
			chai.request(server).post('/blogs/new')
			.set('Content-Type', 'application/x-www-form-urlencoded')
            .field('Content-Type', 'multipart/form-data')
			.field('title','this is test title')
			.field('content','this is content from testing')
			.field('image','heir.jpeg')
			.attach('files','./heir.jpeg')
			.end((error,response)=>{
				response.should.have.status(401)
				response.body.should.have.property('error').eq('Auth failed')
				done()
			})
		})
		const cred={
			email:"muhire416@gmail.com",
			password:'Umusaza36'
		}
		// login

		

		it("should login ",(done)=>{
			chai.request(server).post('/users/login')
			.send(cred)
			.end((error,response)=>{
				response.should.have.status(200)
				response.body.should.have.property('token')
				validtoken=response.body.token
				done()
			})
		})
		//creating blog

		it("should  create new blog ",(done)=>{
			chai.request(server).post('/blogs/new')
			.set('Authorization', validtoken)
            .set('Content-Type', 'multipart/form-data')
			.field('title','this is test title')
			.field('content','this is content from testing')
			.field('image','heir.jpeg')
			.attach('image','./heir.jpeg')
			.end((error,response)=>{
				response.should.have.status(200)
				response.body.should.be.a('object')
				
				done()
			})
		})

		// missing 

		it("should not  create new blog missing required parameters",(done)=>{
			chai.request(server).post('/blogs/new')
			.set('Authorization', validtoken)
            .set('Content-Type', 'multipart/form-data')
			.field('title','this is test title')
			.field('image','heir.jpeg')
			.attach('image','./heir.jpeg')
			.end((error,response)=>{
				response.should.have.status(500)
				response.body.should.be.a('object')
				done()
			})
		})


		

	})

})