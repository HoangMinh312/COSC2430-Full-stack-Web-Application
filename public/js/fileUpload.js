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

const profileCover = document.querySelector('.profileCover')
FilePond.create(profileCover, {
    maxFileSize: '1MB',
    imageResizeTargetWidth: 200,
    imageResizeTargetHeight: 200,
})
