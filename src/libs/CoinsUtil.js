/**
 * Utils class
 * 
 * @author AnhTai <taipa@cardano-labo.com>
 */
import Bip39 from 'bip39';

export default class CoinsUtil {
    /**
     * 
     * @param targetScreen : targetScreen's screen key
     * @param type : Type of route (push or pop), default is push
     */
    static generateMnemonic() {
        return Bip39.generateMnemonic();
    }

    /**
	  * 
	  */
    static validateMnemonic(mnemonic) {
        return Bip39.validateMnemonic(mnemonic);
    }

	/**
	  * Convert Obj to Arr
	  */
    static mnemonicToSeed(mnemonic) {
        return Bip39.mnemonicToSeed(mnemonic);
    }
}
