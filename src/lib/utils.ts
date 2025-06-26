export function formatMessageTime(date:string){
    return new Date(date).toLocaleDateString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}