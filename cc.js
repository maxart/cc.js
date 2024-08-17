class CharaChorderDevice {
    constructor() {
        this.port = null;
        this.reader = null;
        this.writer = null;
        this.readableStreamClosed = null;
        this.writableStreamClosed = null;
        this.debug = false; // Set to true for console logging
        this.initializeKeymapCodes();
    }

    initializeKeymapCodes() {
        this.KEYMAP_CODES = new Map([
            [0, { id: "NO_ACTION", display: "No Action" }],
            [32, { id: "SPACE", display: "SPACE" }],
            [33, { id: "!", display: "!" }],
            [34, { id: '"', display: '"' }],
            [35, { id: "#", display: "#" }],
            [36, { id: "$", display: "$" }],
            [37, { id: "%", display: "%" }],
            [38, { id: "&", display: "&" }],
            [39, { id: "'", display: "'" }],
            [40, { id: "(", display: "(" }],
            [41, { id: ")", display: ")" }],
            [42, { id: "*", display: "*" }],
            [43, { id: "+", display: "+" }],
            [44, { id: ",", display: "," }],
            [45, { id: "-", display: "-" }],
            [46, { id: ".", display: "." }],
            [47, { id: "/", display: "/" }],
            [48, { id: "0", display: "0" }],
            [49, { id: "1", display: "1" }],
            [50, { id: "2", display: "2" }],
            [51, { id: "3", display: "3" }],
            [52, { id: "4", display: "4" }],
            [53, { id: "5", display: "5" }],
            [54, { id: "6", display: "6" }],
            [55, { id: "7", display: "7" }],
            [56, { id: "8", display: "8" }],
            [57, { id: "9", display: "9" }],
            [58, { id: ":", display: ":" }],
            [59, { id: ";", display: ";" }],
            [60, { id: "<", display: "<" }],
            [61, { id: "=", display: "=" }],
            [62, { id: ">", display: ">" }],
            [63, { id: "?", display: "?" }],
            [64, { id: "@", display: "@" }],
            [65, { id: "A", display: "A" }],
            [66, { id: "B", display: "B" }],
            [67, { id: "C", display: "C" }],
            [68, { id: "D", display: "D" }],
            [69, { id: "E", display: "E" }],
            [70, { id: "F", display: "F" }],
            [71, { id: "G", display: "G" }],
            [72, { id: "H", display: "H" }],
            [73, { id: "I", display: "I" }],
            [74, { id: "J", display: "J" }],
            [75, { id: "K", display: "K" }],
            [76, { id: "L", display: "L" }],
            [77, { id: "M", display: "M" }],
            [78, { id: "N", display: "N" }],
            [79, { id: "O", display: "O" }],
            [80, { id: "P", display: "P" }],
            [81, { id: "Q", display: "Q" }],
            [82, { id: "R", display: "R" }],
            [83, { id: "S", display: "S" }],
            [84, { id: "T", display: "T" }],
            [85, { id: "U", display: "U" }],
            [86, { id: "V", display: "V" }],
            [87, { id: "W", display: "W" }],
            [88, { id: "X", display: "X" }],
            [89, { id: "Y", display: "Y" }],
            [90, { id: "Z", display: "Z" }],
            [91, { id: "[", display: "[" }],
            [92, { id: "\\", display: "\\" }],
            [93, { id: "]", display: "]" }],
            [94, { id: "^", display: "^" }],
            [95, { id: "_", display: "_" }],
            [96, { id: "`", display: "`" }],
            [97, { id: "a", display: "a" }],
            [98, { id: "b", display: "b" }],
            [99, { id: "c", display: "c" }],
            [100, { id: "d", display: "d" }],
            [101, { id: "e", display: "e" }],
            [102, { id: "f", display: "f" }],
            [103, { id: "g", display: "g" }],
            [104, { id: "h", display: "h" }],
            [105, { id: "i", display: "i" }],
            [106, { id: "j", display: "j" }],
            [107, { id: "k", display: "k" }],
            [108, { id: "l", display: "l" }],
            [109, { id: "m", display: "m" }],
            [110, { id: "n", display: "n" }],
            [111, { id: "o", display: "o" }],
            [112, { id: "p", display: "p" }],
            [113, { id: "q", display: "q" }],
            [114, { id: "r", display: "r" }],
            [115, { id: "s", display: "s" }],
            [116, { id: "t", display: "t" }],
            [117, { id: "u", display: "u" }],
            [118, { id: "v", display: "v" }],
            [119, { id: "w", display: "w" }],
            [120, { id: "x", display: "x" }],
            [121, { id: "y", display: "y" }],
            [122, { id: "z", display: "z" }],
            [123, { id: "{", display: "{" }],
            [124, { id: "|", display: "|" }],
            [125, { id: "}", display: "}" }],
            [126, { id: "~", display: "~" }],
            [127, { id: "DEL", display: "DEL" }],
            [256, { id: "KSC_00", display: "No Key" }],
            [257, { id: "KSC_01", display: "Error Roll Over" }],
            [258, { id: "KSC_02", display: "POST Fail" }],
            [259, { id: "KSC_03", display: "Error Undefined" }],
            [260, { id: "KEY_A", display: "A" }],
            [261, { id: "KEY_B", display: "B" }],
            [262, { id: "KEY_C", display: "C" }],
            [263, { id: "KEY_D", display: "D" }],
            [264, { id: "KEY_E", display: "E" }],
            [265, { id: "KEY_F", display: "F" }],
            [266, { id: "KEY_G", display: "G" }],
            [267, { id: "KEY_H", display: "H" }],
            [268, { id: "KEY_I", display: "I" }],
            [269, { id: "KEY_J", display: "J" }],
            [270, { id: "KEY_K", display: "K" }],
            [271, { id: "KEY_L", display: "L" }],
            [272, { id: "KEY_M", display: "M" }],
            [273, { id: "KEY_N", display: "N" }],
            [274, { id: "KEY_O", display: "O" }],
            [275, { id: "KEY_P", display: "P" }],
            [276, { id: "KEY_Q", display: "Q" }],
            [277, { id: "KEY_R", display: "R" }],
            [278, { id: "KEY_S", display: "S" }],
            [279, { id: "KEY_T", display: "T" }],
            [280, { id: "KEY_U", display: "U" }],
            [281, { id: "KEY_V", display: "V" }],
            [282, { id: "KEY_W", display: "W" }],
            [283, { id: "KEY_X", display: "X" }],
            [284, { id: "KEY_Y", display: "Y" }],
            [285, { id: "KEY_Z", display: "Z" }],
            [286, { id: "KEY_1", display: "1" }],
            [287, { id: "KEY_2", display: "2" }],
            [288, { id: "KEY_3", display: "3" }],
            [289, { id: "KEY_4", display: "4" }],
            [290, { id: "KEY_5", display: "5" }],
            [291, { id: "KEY_6", display: "6" }],
            [292, { id: "KEY_7", display: "7" }],
            [293, { id: "KEY_8", display: "8" }],
            [294, { id: "KEY_9", display: "9" }],
            [295, { id: "KEY_0", display: "0" }],
            [296, { id: "ENTER", display: "ENTER" }],
            [297, { id: "ESC", display: "ESC" }],
            [298, { id: "BKSP", display: "BKSP" }],
            [299, { id: "TAB", display: "TAB" }],
            [300, { id: "KSC_2C", display: "SPACE" }],
            [301, { id: "KSC_2D", display: "-" }],
            [302, { id: "KSC_2E", display: "=" }],
            [303, { id: "KSC_2F", display: "[" }],
            [304, { id: "KSC_30", display: "]" }],
            [305, { id: "KSC_31", display: "\\" }],
            [306, { id: "KSC_32", display: "Non-US #" }],
            [307, { id: "KSC_33", display: ";" }],
            [308, { id: "KSC_34", display: "'" }],
            [309, { id: "KSC_35", display: "`" }],
            [310, { id: "KSC_36", display: "," }],
            [311, { id: "KSC_37", display: "." }],
            [312, { id: "KSC_38", display: "/" }],
            [313, { id: "CAPSLOCK", display: "CAPS" }],
            [314, { id: "F1", display: "F1" }],
            [315, { id: "F2", display: "F2" }],
            [316, { id: "F3", display: "F3" }],
            [317, { id: "F4", display: "F4" }],
            [318, { id: "F5", display: "F5" }],
            [319, { id: "F6", display: "F6" }],
            [320, { id: "F7", display: "F7" }],
            [321, { id: "F8", display: "F8" }],
            [322, { id: "F9", display: "F9" }],
            [323, { id: "F10", display: "F10" }],
            [324, { id: "F11", display: "F11" }],
            [325, { id: "F12", display: "F12" }],
            [326, { id: "PRTSCN", display: "PRTSC" }],
            [327, { id: "SCRLK", display: "SCRLK" }],
            [328, { id: "PAUSE", display: "PAUSE" }],
            [329, { id: "INSERT", display: "INS" }],
            [330, { id: "HOME", display: "HOME" }],
            [331, { id: "PGUP", display: "PGUP" }],
            [332, { id: "DELETE", display: "DEL" }],
            [333, { id: "END", display: "END" }],
            [334, { id: "PGDN", display: "PGDN" }],
            [335, { id: "ARROW_RT", display: "RIGHT" }],
            [336, { id: "ARROW_LF", display: "LEFT" }],
            [337, { id: "ARROW_DN", display: "DOWN" }],
            [338, { id: "ARROW_UP", display: "UP" }],
            [339, { id: "NUMLOCK", display: "NUMLK" }],
            [340, { id: "KP_SLASH", display: "KP /" }],
            [341, { id: "KP_ASTER", display: "KP *" }],
            [342, { id: "KP_MINUS", display: "KP -" }],
            [343, { id: "KP_PLUS", display: "KP +" }],
            [344, { id: "KP_ENTER", display: "KP ENT" }],
            [345, { id: "KP_1", display: "KP 1" }],
            [346, { id: "KP_2", display: "KP 2" }],
            [347, { id: "KP_3", display: "KP 3" }],
            [348, { id: "KP_4", display: "KP 4" }],
            [349, { id: "KP_5", display: "KP 5" }],
            [350, { id: "KP_6", display: "KP 6" }],
            [351, { id: "KP_7", display: "KP 7" }],
            [352, { id: "KP_8", display: "KP 8" }],
            [353, { id: "KP_9", display: "KP 9" }],
            [354, { id: "KP_0", display: "KP 0" }],
            [355, { id: "KP_DOT", display: "KP ." }],
            [356, { id: "KSC_64", display: "Non-US \\" }],
            [357, { id: "COMPOSE", display: "COMPOSE" }],
            [358, { id: "POWER", display: "POWER" }],
            [359, { id: "KP_EQUAL", display: "KP =" }],
            [360, { id: "F13", display: "Keyboard F13" }],
            [361, { id: "F14", display: "Keyboard F14" }],
            [362, { id: "F15", display: "Keyboard F15" }],
            [363, { id: "F16", display: "Keyboard F16" }],
            [364, { id: "F17", display: "Keyboard F17" }],
            [365, { id: "F18", display: "Keyboard F18" }],
            [366, { id: "F19", display: "Keyboard F19" }],
            [367, { id: "F20", display: "Keyboard F20" }],
            [368, { id: "F21", display: "Keyboard F21" }],
            [369, { id: "F22", display: "Keyboard F22" }],
            [370, { id: "F23", display: "Keyboard F23" }],
            [371, { id: "F24", display: "Keyboard F24" }],
            [372, { id: "EXECUTE", display: "Keyboard Execute" }],
            [373, { id: "HELP", display: "Keyboard Help" }],
            [374, { id: "MENU", display: "Keyboard Menu" }],
            [375, { id: "SELECT", display: "Keyboard Select" }],
            [376, { id: "STOP", display: "Keyboard Stop" }],
            [377, { id: "AGAIN", display: "Keyboard Again" }],
            [378, { id: "UNDO", display: "Keyboard Undo" }],
            [379, { id: "CUT", display: "Keyboard Cut" }],
            [380, { id: "COPY", display: "Keyboard Copy" }],
            [381, { id: "PASTE", display: "Keyboard Paste" }],
            [382, { id: "FIND", display: "Keyboard Find" }],
            [383, { id: "MUTE", display: "Keyboard Mute" }],
            [384, { id: "VOL_UP", display: "Keyboard Volume Up" }],
            [385, { id: "VOL_DN", display: "Keyboard Volume Down" }],
            [386, { id: "KSC_82", display: "Keyboard Locking Caps Lock" }],
            [387, { id: "KSC_83", display: "Keyboard Locking Num Lock" }],
            [388, { id: "KSC_84", display: "Keyboard Locking Scroll Lock" }],
            [389, { id: "KP_COMMA", display: "Keypad Comma" }],
            [390, { id: "KSC_86", display: "Keypad Equals Sign" }],
            [391, { id: "INTL1", display: "Keyboard International1" }],
            [392, { id: "INTL2", display: "Keyboard International2" }],
            [393, { id: "INTL3", display: "Keyboard International3" }],
            [394, { id: "INTL4", display: "Keyboard International4" }],
            [395, { id: "INTL5", display: "Keyboard International5" }],
            [396, { id: "INTL6", display: "Keyboard International6" }],
            [397, { id: "INTL7", display: "Keyboard International7" }],
            [398, { id: "INTL8", display: "Keyboard International8" }],
            [399, { id: "INTL9", display: "Keyboard International9" }],
            [400, { id: "LANG1", display: "Keyboard Language1" }],
            [401, { id: "LANG2", display: "Keyboard Language2" }],
            [402, { id: "LANG3", display: "Keyboard Language3" }],
            [403, { id: "LANG4", display: "Keyboard Language4" }],
            [404, { id: "LANG5", display: "Keyboard Language5" }],
            [405, { id: "LANG6", display: "Keyboard Language6" }],
            [406, { id: "LANG7", display: "Keyboard Language7" }],
            [407, { id: "LANG8", display: "Keyboard Language8" }],
            [408, { id: "LANG9", display: "Keyboard Language9" }],
            [409, { id: "ALT_ERASE", display: "Keyboard Alternate Erase" }],
            [410, { id: "SYSREQ", display: "Keyboard SysReq/Attention" }],
            [411, { id: "CANCEL", display: "Keyboard Cancel" }],
            [412, { id: "CLEAR", display: "Keyboard Clear" }],
            [413, { id: "PRIOR", display: "Keyboard Prior" }],
            [414, { id: "RETURN", display: "Keyboard Return" }],
            [415, { id: "SEPARATOR", display: "Keyboard Separator" }],
            [416, { id: "OUT", display: "Keyboard Out" }],
            [417, { id: "OPER", display: "Keyboard Oper" }],
            [418, { id: "CLEAR_AGAIN", display: "Keyboard Clear/Again" }],
            [419, { id: "CRSEL", display: "Keyboard CrSel/Props" }],
            [420, { id: "EXSEL", display: "Keyboard ExSel" }],
            [421, { id: "KSC_AD", display: "KSC_AD" }],
            [422, { id: "KSC_AE", display: "KSC_AE" }],
            [423, { id: "KSC_AF", display: "KSC_AF" }],
            [424, { id: "KSC_B0", display: "KSC_B0" }],
            [425, { id: "KSC_B1", display: "KSC_B1" }],
            [426, { id: "KSC_B2", display: "KSC_B2" }],
            [427, { id: "KSC_B3", display: "KSC_B3" }],
            [428, { id: "KSC_B4", display: "KSC_B4" }],
            [429, { id: "KSC_B5", display: "KSC_B5" }],
            [430, { id: "KSC_B6", display: "KSC_B6" }],
            [431, { id: "KSC_B7", display: "KSC_B7" }],
            [432, { id: "KSC_B8", display: "KSC_B8" }],
            [433, { id: "KSC_B9", display: "KSC_B9" }],
            [434, { id: "KSC_BA", display: "KSC_BA" }],
            [435, { id: "KSC_BB", display: "KSC_BB" }],
            [436, { id: "KSC_BC", display: "KSC_BC" }],
            [437, { id: "KSC_BD", display: "KSC_BD" }],
            [438, { id: "KSC_BE", display: "KSC_BE" }],
            [439, { id: "KSC_BF", display: "KSC_BF" }],
            [440, { id: "KSC_C0", display: "KSC_C0" }],
            [441, { id: "KSC_C1", display: "KSC_C1" }],
            [442, { id: "KSC_C2", display: "KSC_C2" }],
            [443, { id: "KSC_C3", display: "KSC_C3" }],
            [444, { id: "KSC_C4", display: "KSC_C4" }],
            [445, { id: "KSC_C5", display: "KSC_C5" }],
            [446, { id: "KSC_C6", display: "KSC_C6" }],
            [447, { id: "KSC_C7", display: "KSC_C7" }],
            [448, { id: "KSC_C8", display: "KSC_C8" }],
            [449, { id: "KSC_C9", display: "KSC_C9" }],
            [450, { id: "KSC_CA", display: "KSC_CA" }],
            [451, { id: "KSC_CB", display: "KSC_CB" }],
            [452, { id: "KSC_CC", display: "KSC_CC" }],
            [453, { id: "KSC_CD", display: "KSC_CD" }],
            [454, { id: "KSC_CE", display: "KSC_CE" }],
            [455, { id: "KSC_CF", display: "KSC_CF" }],
            [456, { id: "KSC_D0", display: "KSC_D0" }],
            [457, { id: "KSC_D1", display: "KSC_D1" }],
            [458, { id: "KSC_D2", display: "KSC_D2" }],
            [459, { id: "KSC_D3", display: "KSC_D3" }],
            [460, { id: "KSC_D4", display: "KSC_D4" }],
            [461, { id: "KSC_D5", display: "KSC_D5" }],
            [462, { id: "KSC_D6", display: "KSC_D6" }],
            [463, { id: "KSC_D7", display: "KSC_D7" }],
            [464, { id: "KSC_D8", display: "KSC_D8" }],
            [465, { id: "KSC_D9", display: "KSC_D9" }],
            [466, { id: "KSC_DA", display: "KSC_DA" }],
            [467, { id: "KSC_DB", display: "KSC_DB" }],
            [468, { id: "KSC_DC", display: "KSC_DC" }],
            [469, { id: "KSC_DD", display: "KSC_DD" }],
            [470, { id: "KSC_DE", display: "KSC_DE" }],
            [471, { id: "KSC_DF", display: "KSC_DF" }],
            [472, { id: "KSC_E0", display: "KSC_E0" }],
            [473, { id: "KSC_E1", display: "KSC_E1" }],
            [474, { id: "KSC_E2", display: "KSC_E2" }],
            [475, { id: "KSC_E3", display: "KSC_E3" }],
            [476, { id: "KSC_E4", display: "KSC_E4" }],
            [477, { id: "KSC_E5", display: "KSC_E5" }],
            [478, { id: "KSC_E6", display: "KSC_E6" }],
            [479, { id: "KSC_E7", display: "KSC_E7" }],
            [480, { id: "KSC_E8", display: "KSC_E8" }],
            [481, { id: "KSC_E9", display: "KSC_E9" }],
            [482, { id: "KSC_EA", display: "KSC_EA" }],
            [483, { id: "KSC_EB", display: "KSC_EB" }],
            [484, { id: "KSC_EC", display: "KSC_EC" }],
            [485, { id: "KSC_ED", display: "Media Volume Up" }],
            [486, { id: "KSC_EE", display: "Media Volume Down" }],
            [487, { id: "KSC_EF", display: "Media Mute" }],
            [488, { id: "KSC_F0", display: "Media Browser" }],
            [489, { id: "KSC_F1", display: "Media Browser Back" }],
            [490, { id: "KSC_F2", display: "Media Browser Forward" }],
            [491, { id: "KSC_F3", display: "Media Browser Stop" }],
            [492, { id: "KSC_F4", display: "Media Browser Search" }],
            [493, { id: "KSC_F5", display: "Media Brightness Up" }],
            [494, { id: "KSC_F6", display: "Media Brightness Down" }],
            [495, { id: "KSC_F7", display: "Media Edit" }],
            [496, { id: "KSC_F8", display: "Media System Sleep" }],
            [497, { id: "KSC_F9", display: "Media System Wake" }],
            [498, { id: "KSC_FA", display: "Media Browser Refresh" }],
            [499, { id: "KSC_FB", display: "Media Calculator" }],
            [500, { id: "KSC_FC", display: "KSC_FC" }],
            [501, { id: "KSC_FD", display: "KSC_FD" }],
            [502, { id: "KSC_FE", display: "KSC_FE" }],
            [503, { id: "KSC_FF", display: "KSC_FF" }],
            [504, { id: "LEFT_CTRL", display: "Control Keyboard Modifier" }],
            [505, { id: "LEFT_SHIFT", display: "Shift Keyboard Modifier" }],
            [506, { id: "LEFT_ALT", display: "Alt Keyboard Modifier" }],
            [507, { id: "LEFT_GUI", display: "GUI Keyboard Modifier" }],
            [508, { id: "RIGHT_CTRL", display: "Control Keyboard Modifier" }],
            [509, { id: "RIGHT_SHIFT", display: "Shift Keyboard Modifier" }],
            [510, { id: "RIGHT_ALT", display: "Alt Keyboard Modifier" }],
            [511, { id: "RIGHT_GUI", display: "GUI Keyboard Modifier" }],
            [512, { id: "LEFT_CTRL", display: "CTRL" }],
            [513, { id: "LEFT_SHIFT", display: "SHIFT" }],
            [514, { id: "LEFT_ALT", display: "ALT" }],
            [515, { id: "LEFT_GUI", display: "GUI" }],
            [516, { id: "RIGHT_CTRL", display: "CTRL" }],
            [517, { id: "RIGHT_SHIFT", display: "SHIFT" }],
            [518, { id: "RIGHT_ALT", display: "ALT" }],
            [519, { id: "RIGHT_GUI", display: "GUI" }],
            [520, { id: "RELEASE_MOD", display: "Release all keyboard modifiers" }],
            [521, { id: "RELEASE_ALL", display: "Release all keys and keyboard modifiers" }],
            [522, { id: "RELEASE_KEYS", display: "Release all keys, but not keyboard modifiers" }],
            [523, { id: "PRESS_NEXT", display: "Press and do not release the next key/action" }],
            [524, { id: "RELEASE_NEXT", display: "Release the next key/action in the sequence" }],    
            [528, { id: "RESTART", display: "Restart Device" }],
            [530, { id: "BOOT", display: "Reboot to Bootloader" }],
            [532, { id: "GTM", display: "Toggle Generative Text Menu" }],
            [534, { id: "IMPULSE", display: "Toggle Impulse" }],
            [536, { id: "DUP", display: "DUP" }],
            [538, { id: "SPUR", display: "Spurring Toggle" }],
            [540, { id: "AMBILEFT", display: "Ambidextrous Throwover" }],
            [542, { id: "AMBIRIGHT", display: "Ambidextrous Throwover" }],
            [544, { id: "SPACERIGHT", display: "Right Spacebar" }],
            [548, { id: "KM_1_L", display: "Primary Keymap" }],
            [549, { id: "KM_1_R", display: "Primary Keymap" }],
            [550, { id: "KM_2_L", display: "Numeric Layer" }],
            [551, { id: "KM_2_R", display: "Numeric Layer" }],
            [552, { id: "KM_3_L", display: "Function Layer" }],
            [553, { id: "KM_3_R", display: "Function Layer" }],
            [558, { id: "HOLD_COMPOUND", display: "Dynamic Library" }],
            [559, { id: "RELEASE_COMPOUND", display: "Base Library" }],
            [560, { id: "MS_CLICK_BWD", display: "Mouse Backward Button Click" }],
            [561, { id: "MS_CLICK_FWD", display: "Mouse Forward Button Click" }],
            [562, { id: "MS_CLICK_LF", display: "Mouse Left Click" }],
            [563, { id: "MS_CLICK_RT", display: "Mouse Right Click" }],
            [564, { id: "MS_CLICK_MD", display: "Mouse Middle Click" }],
            [565, { id: "MS_MOVE_RT", display: "Mouse Move Right" }],
            [566, { id: "MS_MOVE_LF", display: "Mouse Move Left" }],
            [567, { id: "MS_MOVE_DN", display: "Mouse Move Down" }],
            [568, { id: "MS_MOVE_UP", display: "Mouse Move Up" }],
            [569, { id: "MS_SCRL_RT", display: "Mouse Scroll Right" }],
            [570, { id: "MS_SCRL_LF", display: "Mouse Scroll Left" }],
            [571, { id: "MS_SCRL_DN", display: "Mouse Scroll Down" }],
            [572, { id: "MS_SCRL_UP", display: "Mouse Scroll Up" }],
            [576, { id: "ACTION_DELAY_1000", display: "ACTION_DELAY_1000" }],
            [577, { id: "ACTION_DELAY_100", display: "ACTION_DELAY_100" }],
            [578, { id: "ACTION_DELAY_10", display: "ACTION_DELAY_10" }],
            [579, { id: "ACTION_DELAY_1", display: "ACTION_DELAY_1" }],
            [600, { id: "LH_THUMB_3_3D", display: "Left Hand Thumb Bottom 3D Click" }],
            [601, { id: "LH_THUMB_2_3D", display: "Left Hand Thumb Middle 3D Click" }],
            [602, { id: "LH_THUMB_1_3D", display: "Left Hand Thumb Top 3D Click" }],
            [603, { id: "LH_INDEX_3D", display: "Left Hand Index Finger 3D Click" }],
            [604, { id: "LH_MID_1_3D", display: "Left Hand Middle Finger 3D Click" }],
            [605, { id: "LH_RING_1_3D", display: "Left Hand Ring Finger 3D Click" }],
            [606, { id: "LH_PINKY_3D", display: "Left Hand Pinky 3D Click" }],
            [607, { id: "LH_MID_2_3D", display: "Left Hand Middle Finger 2 3D Click" }],
            [608, { id: "LH_RING_2_3D", display: "Left Hand Ring Finger 2 3D Click" }],
            [609, { id: "RH_THUMB_3_3D", display: "Right Hand Thumb Bottom 3D Click" }],
            [610, { id: "RH_THUMB_2_3D", display: "Right Hand Thumb Middle 3D Click" }],
            [611, { id: "RH_THUMB_1_3D", display: "Right Hand Thumb Top 3D Click" }],
            [612, { id: "RH_INDEX_3D", display: "Right Hand Index Finger 3D Click" }],
            [613, { id: "RH_MID_1_3D", display: "Right Hand Middle Finger 3D Click" }],
            [614, { id: "RH_RING_1_3D", display: "Right Hand Ring Finger 3D Click" }],
            [615, { id: "RH_PINKY_3D", display: "Right Hand Pinky 3D Click" }],
            [616, { id: "RH_MID_2_3D", display: "Right Hand Middle Finger 2 3D Click" }],
            [617, { id: "RH_RING_2_3D", display: "Right Hand Ring Finger 2 3D Click" }]
        ])
    }

    log(...args) {
        if (this.debug) {
            console.log(...args);
        }
    }

    async connect() {
        try {
            this.port = await navigator.serial.requestPort();
            await this.port.open({ baudRate: 115200 });

            const decoder = new TextDecoderStream();
            this.readableStreamClosed = this.port.readable.pipeTo(decoder.writable);
            this.reader = decoder.readable.getReader();

            const encoder = new TextEncoderStream();
            this.writableStreamClosed = encoder.readable.pipeTo(this.port.writable);
            this.writer = encoder.writable.getWriter();
        } catch (error) {
            console.error('Error connecting to device:', error);
            throw error;
        }
    }

    async disconnect() {
        if (this.reader) {
            await this.reader.cancel();
            await this.readableStreamClosed.catch(() => {});
            this.reader = null;
            this.readableStreamClosed = null;
        }

        if (this.writer) {
            await this.writer.close();
            await this.writableStreamClosed;
            this.writer = null;
            this.writableStreamClosed = null;
        }

        if (this.port) {
            await this.port.close();
            this.port = null;
        }
    }

    async sendCommand(command) {
        this.log('Sending command:', command);
        await this.writer.write(command + '\r\n');
        return this.readResponse();
    }

    async readResponse() {
        let response = '';
        while (true) {
            const { value, done } = await this.reader.read();
            if (done) {
                break;
            }
            response += value;
            if (response.includes('\r\n')) {
                break;
            }
        }
        this.log('Received response:', response.trim());
        return response.trim().split(' ');
    }

    async getOperatingSystem() {
        try {
            const response = await this.sendCommand('VAR B1 91');
            this.log('OS response:', response);
            if (response.length < 5) {
                throw new Error('Unexpected response format');
            }
            const value = response[3];
            const status = response[4];
            if (status !== '0') {
                throw new Error(`Failed to get operating system. Status: ${status}`);
            }
            const osCode = parseInt(value, 10);
            const osMap = {
                0: 'Windows',
                1: 'MacOS',
                2: 'Linux',
                3: 'iOS',
                4: 'Android',
                255: 'Unknown'
            };
            return osMap[osCode] || 'Unknown';
        } catch (error) {
            console.error('Error in getOperatingSystem:', error);
            throw error;
        }
    }

    async getKeymap() {
        const keymaps = [];
        for (let layer = 1; layer <= 3; layer++) {
            const layerMap = [];
            for (let keyIndex = 0; keyIndex < 90; keyIndex++) {
                try {
                    const response = await this.sendCommand(`VAR B3 A${layer} ${keyIndex}`);
                    this.log(`Keymap response for layer ${layer}, key ${keyIndex}:`, response);
                    if (response.length < 6) {
                        throw new Error('Unexpected response format');
                    }
                    const actionId = parseInt(response[4], 10);
                    layerMap.push(this.getActionName(actionId));
                } catch (error) {
                    console.error(`Error getting keymap for layer ${layer}, key ${keyIndex}:`, error);
                    layerMap.push('Unknown');
                }
            }
            keymaps.push(layerMap);
        }
        return keymaps;
    }

    async getChordCount() {
        const response = await this.sendCommand('CML C0');
        this.log('Chord count response:', response);
        if (response.length < 3) {
            throw new Error('Unexpected response format for chord count');
        }
        return parseInt(response[2], 10);
    }

    async listChords() {
        try {
            const chordCount = await this.getChordCount();
            const chords = [];

            for (let i = 0; i < chordCount; i++) {
                const response = await this.sendCommand(`CML C1 ${i}`);
                this.log(`Chord response for index ${i}:`, response);
                if (response.length < 5) {
                    throw new Error('Unexpected response format for chord');
                }
                const actions = this.parseChordActions(response[3]);
                const phrase = this.parsePhraseHex(response[4]);
                chords.push({
                    chord: actions.map(action => this.getActionName(action)).join('+'),
                    phrase: phrase
                });
            }

            return chords;
        } catch (error) {
            console.error('Error in listChords:', error);
            throw error;
        }
    }

    parseChordActions(hexString) {
        const bigInt = BigInt(`0x${hexString}`);
        const actions = [];
        for (let i = 0; i < 12; i++) {
            const action = Number((bigInt >> BigInt(10 * i)) & BigInt(0x3ff));
            if (action !== 0) {
                actions.unshift(action);
            }
        }
        return actions;
    }

    parsePhraseHex(hexString) {
        return hexString.match(/.{2}/g).map(hex => String.fromCharCode(parseInt(hex, 16))).join('');
    }

    getActionName(actionId) {
        const action = this.KEYMAP_CODES.get(actionId);
        if (action) {
            return action.display || action.id;
        }
        if (actionId >= 32 && actionId <= 126) {
            return String.fromCharCode(actionId);
        }
        return `Unknown(${actionId})`;
    }
}