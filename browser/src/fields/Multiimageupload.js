"use strict";

module.exports = function (neatFormModule) {
    return [
        function () {
            return {
                restrict: "E",
                template: require("./Multiimageupload.html"),
                scope: {
                    config: "="
                },
                controller: [ 
                    "$scope",
                    "$location",
                    "FileUploader",
                    function ($scope, $location, FileUploader) {

                        let rootUrl = "//" + $location.host() + ":" + $location.port();
                        if (window.NEAT_API_ROOT_URL) {
                            rootUrl = window.NEAT_API_ROOT_URL;
                        }
                        if (window.NEAT_API_UPLOAD_ROOT_URL) {
                            rootUrl = window.NEAT_API_UPLOAD_ROOT_URL;
                        }

                        let uploader = new FileUploader({
                            url: rootUrl + "/upload"
                        });

                        $scope.uploader = uploader;

                        uploader.filters.push({
                            name: 'imageFilter',
                            fn: function (item /*{File|FileLikeObject}*/, options) {
                                let type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                            }
                        });

                        uploader.onAfterAddingFile = function (fileItem) {
                            let formData = [];

                            function flatten(obj, stack) {
                                for (let property in obj) {
                                    if (obj.hasOwnProperty(property)) {
                                        let key = stack + "." + property;
                                        if (!stack) {
                                            key = property;
                                        }

                                        if (typeof obj[property] == "object") {
                                            flatten(obj[property], key);
                                        } else {
                                            let data = {};
                                            data[key] = obj[property];
                                            formData.push(data);
                                        }
                                    }
                                }
                            }

                            flatten($scope.uploadItem);

                            fileItem.formData = formData;
                            fileItem.uploading = true;

                            $scope.uploadItem = {};

                            if (!$scope.config.value) {
                                $scope.config.value = [];
                            }

                            fileItem.index = $scope.config.value.push(fileItem) - 1;
                            fileItem.upload();
                        };

                        uploader.onProgressItem = function (fileItem, progress) {
                            let reader = new FileReader();
                            reader.readAsDataURL(fileItem._file);
                            fileItem.progress = progress;
                        };

                        uploader.onCompleteItem = function (fileItem, data, status) {
                            for (let i = 0; i < $scope.config.value.length; i++) {
                                if ($scope.config.value[i].progress === 100) {
                                    if (status === 200) {
                                        $scope.config.value.splice(i, 1, data);
                                    } else {
                                        $scope.config.value.splice(i, 1);
                                    }
                                }
                            }
                            $scope.config.value = JSON.parse(JSON.stringify($scope.config.value));
                        };

                        $scope.imageMoveLeft = function (index) {
                            if (index < 1 || index > $scope.config.value.length) {
                                return;
                            }

                            let leftImage = $scope.config.value[index - 1];
                            $scope.config.value[index - 1] = $scope.config.value[index];
                            $scope.config.value[index] = leftImage;
                        };

                        $scope.imageMoveRight = function (index) {
                            if (index < 0 || index > $scope.config.value.length - 1) {
                                return;
                            }

                            let rightImage = $scope.config.value[index + 1];
                            $scope.config.value[index + 1] = $scope.config.value[index];
                            $scope.config.value[index] = rightImage;
                        };

                        $scope.imageRemove = function (index) {
                            if (index < 0 || index > $scope.config.value.length) {
                                return;
                            }

                            $scope.config.value.splice(index, 1);
                        };
                    }
                ]
            };
        }
    ];
}