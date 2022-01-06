package at.sde23.asd.room1.usermanagerbackend;

import at.sde23.asd.room1.usermanagerbackend.controller.UserController;
import at.sde23.asd.room1.usermanagerbackend.entity.User;
import at.sde23.asd.room1.usermanagerbackend.exception.UsernameAlreadyExistsException;
import at.sde23.asd.room1.usermanagerbackend.service.JWTService;
import at.sde23.asd.room1.usermanagerbackend.service.LoginRetryService;
import at.sde23.asd.room1.usermanagerbackend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@SpringBootTest
@WebMvcTest(controllers = UserController.class)
class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @MockBean
    private JWTService jwtService;

    @MockBean
    private LoginRetryService loginRetryService;

    @Test
    void whenValidInput_thenReturns201() throws Exception {
        User user = new User();
        when(userService.register(any())).thenReturn(user);

        mockMvc.perform(post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isCreated());
    }

    @Test
    void whenUserAlreadyExists_thenReturns403() throws Exception {
        User existingUser = new User();
        when(userService.register(any())).thenThrow(new UsernameAlreadyExistsException());

        mockMvc.perform(post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(existingUser)))
                .andExpect(status().isForbidden());
    }

}
