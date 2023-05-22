<script lang='ts'>
    export let imageUrl:string = "";

</script>


<div>

    <div class="flex justify-center items-center bg-white w-16 h-16 p-0 md:w-32 md:h-32 md:p-2 rounded-lg">
    
        <!-- <Avatar src={imageUrl} width="w-full" rounded="rounded-full" /> -->
    
        <img  class="max-w-full max-h-full rounded-lg" src={imageUrl} alt="Product Avatar">
    </div>
</div>