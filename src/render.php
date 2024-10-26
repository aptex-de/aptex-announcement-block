<?php

$show = isset($attributes['show']) ? $attributes['show'] : true;
$hide_after_date_time = isset($attributes['hideAfterDateTime']) ? $attributes['hideAfterDateTime'] : '';

$current_time = current_time('mysql');

if ($show || (empty($hide_after_date_time) || strtotime($current_time) < strtotime($hide_after_date_time))) {
    echo sprintf(
        '<div>%s</div>',
        wp_kses_post($content)
    );
}
