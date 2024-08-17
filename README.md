# cc.js

A JavaScript wrapper for [CharaChorder](https://www.charachorder.com)'s [Serial API](https://docs.charachorder.com/SerialAPI.html).


## Features

- Supports modern web browsers with Web Serial API.
- Implements key CharaChorder Serial API commands.
- Provides easy-to-use methods for common operations.

## Usage

```javascript
<script src="cc.js"></script>

<script>
document.getElementById('connectButton').addEventListener('click', async () => {
    const device = new CharaChorderDevice();

    try {
        await device.connect();
        console.log("Connected to device");

        const os = await device.getOperatingSystem();
        console.log("Operating System:", os);

        const keymap = await device.getKeymap();
        console.log("Keymap:", keymap);

        const chords = await device.listChords();
        console.log("Chords:", chords);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await device.disconnect();
        console.log("Disconnected from device");
    }
});
</script>
```

## Requirements

- Web browser with Web Serial API support (Chrome 89+, Edge 89+, Opera 76+)

## Links

- [CharaChorder Official Website](https://www.charachorder.com)
- [CharaChorder Serial API Documentation](https://docs.charachorder.com/SerialAPI.html)
- [CharaChorder Discord Server](https://discord.gg/QZJeZGtznG)
- [CharaChorder DeviceManager (Source Project)](https://github.com/CharaChorder/DeviceManager/)

## License

AGPL-3.0 license

## Attribution

This project is based on the [CharaChorder DeviceManager](https://github.com/CharaChorder/DeviceManager/) project. We are grateful to the original authors and contributors for their work.