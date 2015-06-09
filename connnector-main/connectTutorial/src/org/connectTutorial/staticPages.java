package org.connectTutorial;

import com.perceptivesoftware.pif.util.AbstractSecureHttpComponent;

public class staticPages extends AbstractSecureHttpComponent  {

	public staticPages()
	{
		super("/", "/site");
	}
}
