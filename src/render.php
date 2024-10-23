<?php

$hide = isset($attributes['hide']) ? $attributes['hide'] : false;
$hide_after_date_time = isset($attributes['hideAfterDateTime']) ? $attributes['hideAfterDateTime'] : '';

$current_time = current_time('mysql');

if (!$hide && (empty($hide_after_date_time) || strtotime($current_time) < strtotime($hide_after_date_time))) {
    echo sprintf(
        '<div>%s</div>',
        wp_kses_post($content) // Allow safe HTML content to render
    );
}
