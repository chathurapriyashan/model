export default function getMaxIndex(array=[]){
    const max = array.reduce((max ,cur,index)=>{
        if(index == 0) max = cur;
        if(cur > max) max = cur;
        return max
    },0)

    const maxIndex = array.indexOf(max);
    return maxIndex
}