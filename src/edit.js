import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, DateTimePicker } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();

	// Destructure attributes
	const { show, hideAfterDateTime, content, useExpiryDate } = attributes;

	// Handle changes in the inspector controls
	const onToggleShow = (value) => {
		setAttributes({ show: value });
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

	const isHidden = !show || (useExpiryDate && new Date() > new Date(hideAfterDateTime));
	const isHiddenClass = isHidden ? 'apx-announcement-is-hidden' : '';

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Announcement Settings', 'apx-announcement')} initialOpen={true}>
					<ToggleControl
						label={__('Show Announcement', 'apx-announcement')}
						checked={show}
						onChange={onToggleShow}
					/>
					<ToggleControl
						label={__('Automatic Expiration', 'apx-announcement')}
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
			<div className={isHiddenClass}>
				{isHidden && <><div className='apx-disabled'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="apx-icon--disabled"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg> {__('hidden', 'apx-announcement')}</div></>}
				<RichText
					identifier="content"
					tagName="p"
					{...blockProps}
					value={content}
					onChange={onChangeContent}
					placeholder={__('Write your announcement here...', 'apx-announcement')}
				/>
			</div>
		</>
	);
}
