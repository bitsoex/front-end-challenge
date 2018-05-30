import CryptoJS = require("crypto-js");

export class ConstantsManager {
    // TODO: Find a crypto equivalent in TS
    private static BASE_URL = "https://api.bitso.com/v3/";
    private static API_KEY = "";
    private static API_SECRET = "";
    private static NONCE: Number = new Date().getTime();

    public static ACCOUNTS = ConstantsManager.BASE_URL + "accounts/";
    public static AVAILABLE_BOOKS = ConstantsManager.BASE_URL + "available_books/";
    public static TICKER = ConstantsManager.BASE_URL + "ticker/";
    public static ORDER_BOOK = ConstantsManager.BASE_URL + "order_book/";
    public static TRADES = ConstantsManager.BASE_URL + "trades/";
}
