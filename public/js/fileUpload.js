FilePond.registerPlugin(
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType
)

FilePond.parse(document.body)

const productCover = document.querySelector('.productCover')
FilePond.create(productCover, {
    acceptedFileTypes: ['image/png', 'image/jpeg'],
    maxFileSize: '2MB',
    imageResizeTargetWidth: 1024,
    imageResizeTargetHeight: 1024,
})
