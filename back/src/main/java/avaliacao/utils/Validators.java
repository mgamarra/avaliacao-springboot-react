package avaliacao.utils;

import java.util.List;

public class Validators {
	
	public static boolean listVazia(List<?> l) {
		return ((l == null ) || (l.size() == 0));
	}

}
