import React, { useEffect } from 'react'
import classNames from 'classnames'
import { Rundown } from '@sofie-automation/corelib/dist/dataModel/Rundown'
import { getAllowConfigure, getAllowService, getAllowStudio } from '../../lib/localStorage'
import { useTracker } from '../../lib/ReactMeteorData/ReactMeteorData'
import { confirmDeleteRundown, confirmReSyncRundown, getShowStyleBaseLink } from './util'
import { useDrag, useDrop } from 'react-dnd'
import { IRundownDragObject, IRundownPlaylistUiAction, RundownListDragDropTypes } from './DragAndDropTypes'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { unprotectString } from '../../../lib/lib'
import RundownListItemView from './RundownListItemView'
import { RundownLayoutBase } from '../../../lib/collections/RundownLayouts'
import { RundownId, RundownPlaylistId } from '@sofie-automation/corelib/dist/dataModel/Ids'
import { ShowStyleBases, ShowStyleVariants } from '../../collections'
import { useTranslation } from 'react-i18next'
import { DBShowStyleBase } from '@sofie-automation/corelib/dist/dataModel/ShowStyleBase'
import { DBShowStyleVariant } from '@sofie-automation/corelib/dist/dataModel/ShowStyleVariant'

export const HTML_ID_PREFIX = 'rundown-'

export function RundownListItem({
	isActive,
	rundown,
	rundownViewUrl,
	rundownLayouts,
	swapRundownOrder,
	isOnlyRundownInPlaylist,
}: {
	isActive: boolean
	rundown: Rundown
	rundownViewUrl?: string
	rundownLayouts: Array<RundownLayoutBase>
	swapRundownOrder: (a: RundownId, b: RundownId) => void
	playlistId: RundownPlaylistId
	isOnlyRundownInPlaylist?: boolean
	action?: IRundownPlaylistUiAction
}): JSX.Element | null {
	const { t } = useTranslation()

	const showStyleBase = useTracker(
		() =>
			ShowStyleBases.findOne(rundown.showStyleBaseId, { projection: { name: 1 } }) as
				| Pick<DBShowStyleBase, 'name'>
				| undefined,
		[rundown.showStyleBaseId]
	)
	const showStyleVariant = useTracker(
		() =>
			ShowStyleVariants.findOne(rundown.showStyleVariantId, { projection: { name: 1 } }) as
				| Pick<DBShowStyleVariant, 'name'>
				| undefined,
		[rundown.showStyleVariantId]
	)

	const userCanConfigure = getAllowConfigure()

	const [dragState, connectDragSource, connectDragPreview] = useDrag<IRundownDragObject, void, { isDragging: boolean }>(
		{
			type: RundownListDragDropTypes.RUNDOWN,
			collect: (monitor) => {
				return {
					isDragging: monitor.isDragging(),
				}
			},
			item: {
				id: rundown._id,
				rundownLayouts,
			},
		},
		[rundown._id, rundownLayouts]
	)

	const [, connectDropTarget] = useDrop<IRundownDragObject, void, {}>(
		{
			accept: RundownListDragDropTypes.RUNDOWN,
			hover: (item, monitor) => {
				if (monitor.getItemType() === RundownListDragDropTypes.RUNDOWN) {
					// if that rundown is not this rundown
					if (item && rundown._id !== item.id) {
						swapRundownOrder(rundown._id, item.id)
					}
				}
			},
		},
		[rundown, swapRundownOrder]
	)

	useEffect(() => {
		connectDragPreview(getEmptyImage())
	}, [connectDragPreview])

	// rundown ids can start with digits, which is illegal for HTML id attributes
	const htmlElementId = `${HTML_ID_PREFIX}${unprotectString(rundown._id)}`

	const showStyleLabel =
		showStyleVariant && showStyleBase && showStyleVariant.name !== showStyleBase.name
			? t('{{showStyleVariant}} – {{showStyleBase}}', {
					showStyleVariant: showStyleVariant.name,
					showStyleBase: showStyleBase.name,
			  })
			: showStyleBase?.name || ''

	return (
		<RundownListItemView
			isActive={isActive}
			className={classNames({
				dragging: dragState.isDragging,
				orphaned: rundown.orphaned,
			})}
			connectDragSource={connectDragSource}
			connectDropTarget={connectDropTarget}
			htmlElementId={htmlElementId}
			isDragLayer={false}
			renderTooltips={dragState.isDragging !== true}
			rundownViewUrl={rundownViewUrl}
			rundown={rundown}
			isOnlyRundownInPlaylist={isOnlyRundownInPlaylist}
			rundownLayouts={rundownLayouts}
			showStyleName={showStyleLabel}
			showStyleBaseURL={userCanConfigure ? getShowStyleBaseLink(rundown.showStyleBaseId) : undefined}
			confirmDeleteRundownHandler={
				(rundown.orphaned && getAllowStudio()) || userCanConfigure || getAllowService()
					? () => confirmDeleteRundown(rundown, t)
					: undefined
			}
			confirmReSyncRundownHandler={
				rundown.orphaned && getAllowStudio() ? () => confirmReSyncRundown(rundown, t) : undefined
			}
		/>
	)
}
