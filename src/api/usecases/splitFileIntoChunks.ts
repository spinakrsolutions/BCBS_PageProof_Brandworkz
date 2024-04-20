export async function splitFileIntoChunks(buffer: Buffer, chunkSize: number): Promise<Buffer[]> {
    const buffers: Buffer[] = [];
    let offset = 0;
    
    while (offset < buffer.length) {
        const chunk = buffer.slice(offset, offset + chunkSize);
        buffers.push(chunk);
        offset += chunkSize;
    }

    return buffers;
}