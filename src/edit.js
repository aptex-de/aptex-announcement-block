import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, DateTimePicker } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();

	// Destructure attributes
	const { hide, hideAfterDateTime, content, useExpiryDate } = attributes;

	// Handle changes in the inspector controls
	const onToggleHide = (value) => {
		setAttributes({ hide: value });
	};

	const onDateTimeChange = (value) => {
		setAttributes({ hideAfterDateTime: value });
	};

	const onChangeContent = (newContent) => {
		setAttributes({ content: newContent })
	}

	const onToggleUseExpiryDate = (value) => {
		setAttributes({ useExpiryDate: value });
		if (!value) {
			// Clear the date if the toggle is turned off
			setAttributes({ hideAfterDateTime: '' });
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Announcement Settings', 'apx-announcement')} initialOpen={true}>
					<ToggleControl
						label={__('Hide Announcement', 'apx-announcement')}
						checked={hide}
						onChange={onToggleHide}
					/>
					<ToggleControl
						label={__('Use Expiry Date', 'apx-announcement')}
						checked={useExpiryDate}
						onChange={onToggleUseExpiryDate}
					/>
					{useExpiryDate && (
						<DateTimePicker
							label={__('Hide After Date', 'apx-announcement')}
							currentDate={hideAfterDateTime}
							onChange={onDateTimeChange}
							is12Hour={false}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<RichText
				identifier="content"
				tagName="p"
				{...blockProps}
				value={content}
				onChange={onChangeContent}
				placeholder="Write your announcement here..."
			/>
		</>
	);
}
