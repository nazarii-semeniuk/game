class WebSockets {

    private socket: WebSocket;
    private connected: boolean = false;

    constructor() {
        this.socket = new WebSocket('ws://localhost:9999');

        this.socket.onopen = () => {
            this.connected = true;
        }
    }

    public onOpen(callback: () => void) {
        if(this.connected) {
            callback();
        } else {
            this.socket.onopen = callback;
        }
    }

    public onMessage(callback: (data: any) => void) {
        this.socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            callback(data);
        }
    }

    public send(data: any) {
        this.socket.send(JSON.stringify(data));
    }

}

export default new WebSockets();