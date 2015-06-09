package org.connectTutorial;

import com.perceptivesoftware.pif.common.webservice.JAXRSApplication;
import com.perceptivesoftware.pif.common.webservice.JAXRSService;
import com.perceptivesoftware.pif.util.AbstractLifecycleComponent;
import com.perceptivesoftware.pif.util.AbstractRESTComponent;

import org.codehaus.jackson.jaxrs.JacksonJsonProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * An example of a synchronous handler that publish a RESTful interface
 */
public class RESTComponent extends AbstractRESTComponent {
    public static final String ALIAS = "/endpoint";

    endpoint endpoint;
    
    Logger logger = LoggerFactory.getLogger(RESTComponent.class);
    
    @Override
    public void startup() throws Exception {
        endpoint = new endpoint();
        logger.info("endpoint has successfully started");
        
        JAXRSApplication app = new JAXRSApplication();
        app.addSingletons(endpoint);
        app.addSingleton(new JacksonJsonProvider());

        registerApplication(ALIAS, app);
    }
    
    @Override
    public void shutdown() throws Exception {
    	logger.info("endpoint is shutting down.");
        //super.shutdown();
    } 
}
