import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerateHash {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String pass1 = "admin123";
        String pass2 = "user123";

        System.out.println("Hash for 'admin123': " + encoder.encode(pass1));
        System.out.println("Hash for 'user123': " + encoder.encode(pass2));
    }
}
