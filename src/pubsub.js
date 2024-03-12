
export const pubSub = {
    events:{},
    subscribe:function(eventName, fn){
       this.events[eventName] = this.events[eventName] || [];
       this.events[eventName].push(fn);
    },
    publish(eventName, data){
        if(this.events[eventName]){
            this.events[eventName].forEach(func => {
                func(data);                
            });
        }
    }
};