import './AirplaneFilters.scss'
import * as React from 'react'
import c from 'classnames'
import { Filters } from '../../Core/DataEntry/Filters/Filters'
import { Form } from '../../Core/DataEntry/Form/Form'
import FormGroup from '@material-ui/core/FormGroup'
import { ImageFilter } from './FilterTypes/ImageFilter'
import { AirplaneQueryFilters } from '../../../utils/query'
import { RoleFilter } from './FilterTypes/RoleFilter'
import { OriginFilter } from './FilterTypes/OriginFilter'
import { ManufacturerFilter } from './FilterTypes/ManufacturerFilter'
import { UsageStatusFilter } from './FilterTypes/UsageStatusFilter'

interface Props {
    className?: string
    manufacturers?: string[]
    onChangeFilter?: (filters: AirplaneQueryFilters) => void
    origins?: string[]
    roles?: string[]
    usageStatuses?: string[]
}

interface State extends AirplaneQueryFilters {}

export class AirplaneFilters extends React.Component<Props, State> {
    public state: State = {
        filterByAirplaneHasImages: false,
        filterByAirplaneManufacturer: '',
        filterByAirplaneOrigin: '',
        filterByAirplaneRole: '',
        filterByAirplaneUsageStatus: '',
    }

    public render() {
        const { origins, roles, manufacturers, usageStatuses } = this.props

        return (
            <Filters className={this.getClassName()}>
                <Form>
                    <FormGroup row={true}>
                        <ImageFilter
                            className={`asa-AirplaneFilters__filter`}
                            onChange={this.onImageFilterChange}
                        />
                        <RoleFilter
                            className={`asa-AirplaneFilters__filter asa-Select`}
                            onChange={this.onSelectFilterChange}
                            roles={roles}
                        />
                        <OriginFilter
                            className={`asa-AirplaneFilters__filter asa-Select`}
                            onChange={this.onSelectFilterChange}
                            origins={origins}
                        />
                        <ManufacturerFilter
                            className={`asa-AirplaneFilters__filter asa-Select`}
                            onChange={this.onSelectFilterChange}
                            manufacturers={manufacturers}
                        />
                        <UsageStatusFilter
                            className={`asa-AirplaneFilters__filter asa-Select`}
                            onChange={this.onSelectFilterChange}
                            usageStatuses={usageStatuses}
                        />
                    </FormGroup>
                </Form>
            </Filters>
        )
    }

    private onImageFilterChange = (name: string, checked: boolean) => {
        const { onChangeFilter } = this.props

        this.setState({ filterByAirplaneHasImages: checked }, () => {
            if (onChangeFilter) {
                onChangeFilter(this.getFilters())
            }
        })
    }

    private onSelectFilterChange = (name: string, value: string) => {
        const { onChangeFilter } = this.props

        this.setState({ [name]: value }, () => {
            if (onChangeFilter) {
                onChangeFilter(this.getFilters())
            }
        })
    }

    private getFilters = () => {
        const {
            filterByAirplaneHasImages,
            filterByAirplaneRole,
            filterByAirplaneOrigin,
            filterByAirplaneManufacturer,
            filterByAirplaneUsageStatus,
        } = this.state

        return {
            filterByAirplaneHasImages,
            filterByAirplaneRole,
            filterByAirplaneOrigin,
            filterByAirplaneManufacturer,
            filterByAirplaneUsageStatus,
        }
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-AirplaneFilters', {}, className)
    }
}
