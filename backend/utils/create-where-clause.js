export function createWhereClause(params,
                                  database,
                                  prefix = '',
                                  omitWhere = false,
                                  omitAnd = true,) {
    if (Object.keys(params).length !== 0) {
        let query = omitWhere ? '' : 'WHERE '
        const comparator = '='
        for (let [k, v] of Object.entries(params)) {
            if (k === 'weak')
                continue
            if (v) {
                const column = `${prefix}${database.escapeId(k)}`
                const value = database.escape(v)
                query += `${column} ${comparator} ${value} AND `
            }
        }
        // Remove trailing 'AND '
        return omitAnd ? query.substring(0, query.length - 4) : query
    }
    return ""
}
