<script lang='ts'>
    export let imageUrl:string = "";

</script>


<div>

    <div class="flex justify-center items-center bg-white w-32 h-32 p-2 rounded-lg">
    
        <!-- <Avatar src={imageUrl} width="w-full" rounded="rounded-full" /> -->
    
        <img  class="max-w-full max-h-full rounded-lg" src={imageUrl} alt="Product Avatar">
    </div>
</div>