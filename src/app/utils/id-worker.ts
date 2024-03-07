class IdWorker {

    private twepoch = 1588435200000; // Start time cut (2020-05-03)

    private workerIdBits = 10; // The number of bits occupied by workerId

    private timestampBits = 41; // The number of bits occupied by timestamp

    private sequenceBits = 12; // The number of bits occupied by sequence

    private maxWorkerId = 1023; // Maximum supported machine id

    private workerId: number;

    private sequence = 0; // Sequence starting at 0

    private lastTimestamp = -1; // Set lastTimestamp initially to negative value


    constructor(workerId?: number) {

        if(workerId == null) {
            this.workerId = this.generateWorkerId();
        } else {
            if(workerId > this.maxWorkerId || workerId < 0) {
                throw new Error('WorkerId must be between 0 and ' + this.maxWorkerId);
            }
            this.workerId = workerId;
        }

    }

    private generateWorkerId = (): number => {
        return Math.floor(Math.random() * (this.maxWorkerId + 1));
    }

    public nextId = (): number => {

        let timestamp = this.getCurrentTimestamp();

        if(this.lastTimestamp > timestamp) {
            throw new Error('Invalid system clock!');
        }

        if(this.lastTimestamp == timestamp) {
            this.sequence = (this.sequence + 1) & 4095;
            if(this.sequence == 0) {
                timestamp = this.getNextTimestamp(this.lastTimestamp);
            }
        } else {
            this.sequence = 0;
        }

        this.lastTimestamp = timestamp;

        let id = ((timestamp - this.twepoch) << (this.workerIdBits + this.sequenceBits))
            | (this.workerId << this.sequenceBits)
            | this.sequence;

        return id;

    }

    private getCurrentTimestamp = (): number => {
        return Date.now();
    }

    private getNextTimestamp = (lastTimestamp: number): number => {
        let timestamp = this.getCurrentTimestamp();
        while(timestamp <= lastTimestamp) {
            timestamp = this.getCurrentTimestamp();
        }
        return timestamp;
    }

}

export { IdWorker };