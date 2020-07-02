package avaliacao.exception;

public class NegocioException extends RuntimeException {

  private static final long serialVersionUID = 1L;

  private final String message;

  public NegocioException(String message) {
    this.message = message;
  }

  @Override
  public String getMessage() {
    return message;
  }


}
