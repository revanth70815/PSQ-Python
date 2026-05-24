from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import (
    User, Psq1ForeignAffection, Psq2ForeignAssociation,
    Psq3ForeignTravel, Psq4PersonalConduct, Psq5FinancialResponsibility
)

dashboard_bp = Blueprint('dashboard', __name__)


@dashboard_bp.get('/nominee')
@login_required
def nominee_dashboard():
    uid = current_user.id
    return jsonify({
        'user': current_user.to_dict(),
        'submissions': {
            'psq1': [e.to_dict() for e in Psq1ForeignAffection.query.filter_by(user_id=uid).order_by(Psq1ForeignAffection.submission_date.desc()).all()],
            'psq2': [e.to_dict() for e in Psq2ForeignAssociation.query.filter_by(user_id=uid).order_by(Psq2ForeignAssociation.submission_date.desc()).all()],
            'psq3': [e.to_dict() for e in Psq3ForeignTravel.query.filter_by(user_id=uid).order_by(Psq3ForeignTravel.submission_date.desc()).all()],
            'psq4': [e.to_dict() for e in Psq4PersonalConduct.query.filter_by(user_id=uid).order_by(Psq4PersonalConduct.submission_date.desc()).all()],
            'psq5': [e.to_dict() for e in Psq5FinancialResponsibility.query.filter_by(user_id=uid).order_by(Psq5FinancialResponsibility.submission_date.desc()).all()],
        }
    })


@dashboard_bp.get('/officer')
@login_required
def officer_dashboard():
    if not current_user.is_security_officer():
        return jsonify({'error': 'Forbidden'}), 403
    nominees = User.query.filter_by(role='nominee').all()
    result = []
    for n in nominees:
        result.append({
            'user': n.to_dict(),
            'counts': {
                'psq1': len(n.psq1),
                'psq2': len(n.psq2),
                'psq3': len(n.psq3),
                'psq4': len(n.psq4),
                'psq5': len(n.psq5),
            }
        })
    return jsonify(result)
