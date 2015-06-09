package org.connectTutorial;

public class Department {
	
	public String id;
	public String name;
	public String employees[];

	public Department()
	{
		
	}
	public Department(String id, String name, String employees[])
	{
		this.id = id;
		this.name = name;
		this.employees = employees;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String[] getEmployees() {
		return employees;
	}
	public void setEmployees(String[] employees) {
		this.employees = employees;
	}
	
	
	
}
