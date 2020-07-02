package avaliacao.utils;

@FunctionalInterface
public interface FT<OUTPUT> {
	OUTPUT call();
}
