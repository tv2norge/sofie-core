import * as React from 'react'
import * as _ from 'underscore'
import renderItem from './ItemRenderers/ItemRendererFactory'
import { PieceUi } from '../../SegmentTimeline/SegmentTimelineContainer'
import { ContextMenuTrigger } from '@jstarpl/react-contextmenu'
import { contextMenuHoldToDisplayTime } from '../../../lib/lib'
import { BucketAdLibItem } from '../RundownViewBuckets'
import { DBRundownPlaylist } from '@sofie-automation/corelib/dist/dataModel/RundownPlaylist'
import { IAdLibListItem } from '../AdLibListItem'
import { UIShowStyleBase } from '../../../../lib/api/showStyles'
import { UIStudio } from '../../../../lib/api/studios'
import { withMediaObjectStatus, WithMediaObjectStatusProps } from '../../SegmentTimeline/withMediaObjectStatus'

export { ShelfInspector }

interface IShelfInspectorProps {
	selected: BucketAdLibItem | IAdLibListItem | PieceUi | undefined
	showStyleBase: UIShowStyleBase
	studio: UIStudio
	rundownPlaylist: DBRundownPlaylist
	onSelectPiece: (piece: BucketAdLibItem | IAdLibListItem | PieceUi | undefined) => void
}

const ShelfInspector = withMediaObjectStatus<IShelfInspectorProps, {}>()(
	class ShelfInspector extends React.Component<IShelfInspectorProps & WithMediaObjectStatusProps> {
		constructor(props: IShelfInspectorProps & WithMediaObjectStatusProps) {
			super(props)
		}

		shouldComponentUpdate(nextProps: IShelfInspectorProps & WithMediaObjectStatusProps): boolean {
			if (_.isEqual(nextProps, this.props)) return false
			return true
		}

		render(): JSX.Element {
			const { selected, contentStatus, showStyleBase, studio, rundownPlaylist, onSelectPiece } = this.props
			const content =
				selected && renderItem(selected, contentStatus, showStyleBase, studio, rundownPlaylist, onSelectPiece)

			return (
				<ContextMenuTrigger
					id="shelf-context-menu"
					attributes={{
						className: 'rundown-view__shelf__contents__pane shelf-inspector',
					}}
					holdToDisplay={contextMenuHoldToDisplayTime()}
				>
					{content || false}
				</ContextMenuTrigger>
			)
		}
	}
)
