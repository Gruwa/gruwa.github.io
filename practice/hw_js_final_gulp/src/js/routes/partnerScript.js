        let $jsData = JSON.parse($serverData);
        let $html = partnerHtml;
        let $dataTmpl = {
            $data: $jsData
        }
        let $content = template($html, $dataTmpl)

        $('#partners--template__in').html('')
        $('#partners--template__in').append($content)
