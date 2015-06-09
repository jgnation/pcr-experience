package org.connectTutorial;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//TODO implement web service logic
@Path("/")
public class endpoint {    
    Logger logger = LoggerFactory.getLogger(endpoint.class);

	@GET
    @Path("/hello")
    public String helloWorld() {		
        logger.info("invoking helloWorld()");
		return "Hello World!";
    }	
	
	//department information
	String a[] = {"Salamander Hammerhead","Bobby Socks","Steve Doublesteve"};
	Department[] departments = {new Department("1", "R&D", a ), new Department("2", "Sales", a ),new Department("3", "Support", a ),new Department("4", "IT", a )};
	
	@GET
	@Path("/departments/{id}")
	@Produces ( "application/json" )
	public Department sendDepartmentData(@PathParam("id") String id)
	{
		return departments[Integer.parseInt(id)-1];
	}
	
	@GET
	@Path("/departments")
	@Produces ( "application/json" )
	public Department[] sendDepartments()
	{
		return(departments);
		//return Response.status(200).entity(departments).build();
	}
	//@GET
	//@Path("/{name}")
	//public Response greet(@PathParam("name") String name) {
	//    logger.info("invoking greet() with parameter: " + name);
	//    return Response.status(200).entity("Hello, " + name).build();
	//}
	//*/
}
