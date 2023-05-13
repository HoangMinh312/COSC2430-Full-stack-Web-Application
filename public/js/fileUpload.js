FilePond.registerPlugin(
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
    FilePondPluginImagePreview
)

FilePond.parse(document.body)

const productCover = document.querySelector('.productCover')
FilePond.create(productCover, {
    maxFileSize: '1MB',
    imageResizeTargetWidth: 800,
    imageResizeTargetHeight: 800,
})
