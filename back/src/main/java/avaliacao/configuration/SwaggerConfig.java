package avaliacao.configuration;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import com.google.common.base.Predicates;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

  @Bean
  public Docket api() {
//    return new Docket(DocumentationType.SWAGGER_2)//
//        .select()//
//        .apis(RequestHandlerSelectors.any())//
//        .paths(Predicates.not(PathSelectors.regex("/error")))//
//        .build()//
//        .apiInfo(metadata())//
//        .useDefaultResponseMessages(false)//
//        .securitySchemes(new ArrayList<>(Arrays.asList(new ApiKey("Bearer %token", "Authorization", "Header"))))//
//        .tags(new Tag("users", "Operations about users"))//
//        .tags(new Tag("ping", "Just a ping"))//
//        .genericModelSubstitutes(Optional.class);
    
    
    return new Docket(DocumentationType.SWAGGER_2)
            .ignoredParameterTypes(AuthenticationPrincipal.class)
            .select()
            .apis(Predicates.not(RequestHandlerSelectors.basePackage("org.springframework.boot")))
            .paths(PathSelectors.any()).build()
//            .securitySchemes(Lists.newArrayList(apiKey()))
            .securitySchemes(new ArrayList<>(Arrays.asList(new ApiKey("Bearer %token", "Authorization", "Header"))))//

            .securityContexts(Arrays.asList(securityContext()));    

  }

  
//  private ApiKey apiKey() {
//      return new ApiKey("apiKey", "Authorization", "header");
//  }

  private SecurityContext securityContext() {
      return SecurityContext.builder().securityReferences(defaultAuth())
          .forPaths(PathSelectors.any()).build();
  }

  private List<SecurityReference> defaultAuth() {
      AuthorizationScope authorizationScope = new AuthorizationScope(
          "global", "accessEverything");
      AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
      authorizationScopes[0] = authorizationScope;
      return Arrays.asList(new SecurityReference("apiKey",
          authorizationScopes));
      }  
  
//  private ApiInfo metadata() {
//    return new ApiInfoBuilder()//
//        .title("Avaliação")//
//        .description(
//            "This is a sample JWT authentication service. You can find out more about JWT at [https://jwt.io/](https://jwt.io/). For this sample, you can use the `admin` or `client` users (password: admin and client respectively) to test the authorization filters. Once you have successfully logged in and obtained the token, you should click on the right top button `Authorize` and introduce it with the prefix \"Bearer \".")//
//        .version("1.0.0")//
//        .license("MIT License").licenseUrl("http://opensource.org/licenses/MIT")//
//        .contact(new Contact(null, null, "teste@gmail.com"))//
//        .build();
//  }

}
