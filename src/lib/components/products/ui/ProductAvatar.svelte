<script lang='ts'>
    export let imageUrl:string = "";

</script>


<div>

    <div class="flex justify-center items-center bg-white w-16 h-16 md:w-24 md:h-24 p-0  rounded-lg">
    
        <!-- <Avatar src={imageUrl} width="w-full" rounded="rounded-full" /> -->
    
        <img  class="max-w-full max-h-full rounded-lg" src={imageUrl} alt="Product Avatar">
    </div>
</div>