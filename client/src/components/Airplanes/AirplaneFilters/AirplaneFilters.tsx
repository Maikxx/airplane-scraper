import './AirplaneFilters.scss'
import * as React from 'react'
import c from 'classnames'
import { Filters } from '../../Core/DataEntry/Filters/Filters'
import { Form } from '../../Core/DataEntry/Form/Form'
import FormGroup from '@material-ui/core/FormGroup'
import { ImageFilter } from './FilterTypes/ImageFilter'
import { AirplaneQueryFilters } from '../../../utils/query'
import { RoleFilter } from './FilterTypes/RoleFilter'

interface Props {
    className?: string
    onChangeFilter?: (filters: AirplaneQueryFilters) => void
    roles?: string[]
}

interface State extends AirplaneQueryFilters {}

export class AirplaneFilters extends React.Component<Props, State> {
    public state: State = {
        filterByAirplaneHasImages: false,
        filterByAirplaneRole: '',
    }

    public render() {
        const { roles } = this.props

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
        const { filterByAirplaneHasImages, filterByAirplaneRole } = this.state

        return {
            filterByAirplaneHasImages,
            filterByAirplaneRole,
        }
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-AirplaneFilters', {}, className)
    }
}
